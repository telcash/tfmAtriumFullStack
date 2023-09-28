import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';

describe('Client (e2e)', () => {
  let app: INestApplication;
  let accessToken: string;
  let addressId: number;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('Debe retornar usuario registrado', () => {
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        firstName: 'Client e2e',
        lastName: 'Client e2e Last Name',
        email: 'cliente2e@client.com',
        password: 'Client1234*',
        mobile: '123456789',
      })
      .expect(201)
      .expect(({ body }) => {
        expect(body.firstName).toBe('Client e2e');
        expect(body.lastName).toBe('Client e2e Last Name');
        expect(body.email).toBe('cliente2e@client.com');
        expect(body.mobile).toBe('123456789');
      });
  });

  it('Debe retornar error al registrar un usuario que ya existe', () => {
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        firstName: 'Client e2e',
        lastName: 'Client e2e Last Name',
        email: 'cliente2e@client.com',
        password: 'Client1234*',
        mobile: '123456789',
      })
      .expect(400);
  });

  it('Debe retornar error al iniciar sesión por usuario inexistente', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'nonuser@user.com',
        password: 'User1234*',
      })
      .expect(404);
  });

  it('Debe retornar error al iniciar sesión por contraseña incorrecta', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'cliente2e@client.com',
        password: 'Wrong1234*',
      })
      .expect(401);
  });

  it('Debe retornar tokens al iniciar sesión con credenciales correctas', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'cliente2e@client.com',
        password: 'Client1234*',
      })
      .expect(201)
      .expect(({ body }) => {
        expect(body).toHaveProperty('accessToken');
        expect(body).toHaveProperty('refreshToken');
        accessToken = body.accessToken;
      });
  });

  it('Debe obtener listado de productos', () => {
    return request(app.getHttpServer())
      .get('/products')
      .set('Authorization', 'Bearer ' + accessToken)
      .expect(200)
      .expect(({ body }) => {
        expect(body).toHaveLength(36);
        for (const product of body) {
          expect(product).toHaveProperty('id');
          expect(product).toHaveProperty('name');
          expect(product).toHaveProperty('description');
          expect(product).toHaveProperty('price');
          expect(product).toHaveProperty('image');
          expect(product).toHaveProperty('stock');
          expect(product).toHaveProperty('availability');
        }
      });
  });

  it('Debe retornar un listado de las categorías', () => {
    return request(app.getHttpServer())
      .get('/categories')
      .set('Authorization', 'Bearer ' + accessToken)
      .expect(200)
      .expect(({ body }) => {
        expect(body).toHaveLength(3);
        for (const category of body) {
          expect(category).toHaveProperty('id');
          expect(category).toHaveProperty('name');
        }
      });
  });

  it('Debe agregar un producto al carrito del usuario', () => {
    return request(app.getHttpServer())
      .post('/carts/mycart/items')
      .set('Authorization', 'Bearer ' + accessToken)
      .send({
        productId: 1,
        quantity: 1,
      })
      .expect(201)
      .expect(({ body }) => {
        expect(body).toHaveProperty('productId');
        expect(body.productId).toBe(1);
        expect(body).toHaveProperty('quantity');
        expect(body.quantity).toBe(1);
        expect(body).toHaveProperty('cartId');
        expect(body).toHaveProperty('price');
      });
  });

  it('Debe crear una dirección de envío de un usuario', () => {
    return request(app.getHttpServer())
      .post('/addresses')
      .set('Authorization', 'Bearer ' + accessToken)
      .send({
        street: 'Calle E2e-test',
        postalCode: '10000',
        city: 'Test-city',
        country: 'Test-country',
      })
      .expect(201)
      .expect(({ body }) => {
        expect(body).toHaveProperty('id');
        addressId = body.id;
        expect(body.street).toBe('Calle E2e-test');
        expect(body.postalCode).toBe('10000');
        expect(body.city).toBe('Test-city');
        expect(body.country).toBe('Test-country');
      });
  });

  it('Debe hacer checkout del carrito y devolver el id de la orden', () => {
    return request(app.getHttpServer())
      .post('/carts/mycart/checkout')
      .set('Authorization', 'Bearer ' + accessToken)
      .send({
        addressId: addressId,
      })
      .expect(201);
  });

  afterAll(async () => {
    await app.close();
  });
});
