import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';

describe('Admin (e2e)', () => {
  let app: INestApplication;
  let accessToken: string;
  let productId: number;
  let categoryId: number;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('Debe retornar tokens al iniciar sesión con credenciales de admin correctas', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'admin@admin.com',
        password: 'Admin1234*',
      })
      .expect(201)
      .expect(({ body }) => {
        expect(body).toHaveProperty('accessToken');
        expect(body).toHaveProperty('refreshToken');
        accessToken = body.accessToken;
      });
  });

  it('Debe crear un producto', () => {
    return request(app.getHttpServer())
      .post('/products')
      .set('Authorization', 'Bearer ' + accessToken)
      .send({
        name: 'Product e2e',
        description: 'Product e2e description',
        price: 10,
        stock: 5,
        availability: 'STOCK',
      })
      .expect(201)
      .expect(({ body }) => {
        expect(body).toHaveProperty('id');
        productId = body.id;
        expect(body.name).toBe('Product e2e');
        expect(body.description).toBe('Product e2e description');
        expect(body.price).toBe(10);
        expect(body.stock).toBe(5);
        expect(body.availability).toBe('STOCK');
      });
  });

  it('Debe actualizar un producto', () => {
    return request(app.getHttpServer())
      .patch(`/products/${productId}`)
      .set('Authorization', 'Bearer ' + accessToken)
      .send({
        name: 'Product e2e update name',
        price: 50,
      })
      .expect(200)
      .expect(({ body }) => {
        expect(body.name).toBe('Product e2e update name'),
          expect(body.price).toBe(50);
      });
  });

  it('Debe eliminar un producto', () => {
    return request(app.getHttpServer())
      .delete(`/products/${productId}`)
      .set('Authorization', 'Bearer ' + accessToken)
      .expect(200)
      .expect(({ body }) => {
        expect(body.id).toBe(productId);
      });
  });

  it('Debe crear una categoría', () => {
    return request(app.getHttpServer())
      .post('/categories')
      .set('Authorization', 'Bearer ' + accessToken)
      .send({
        name: 'Category E2e',
      })
      .expect(201)
      .expect(({ body }) => {
        expect(body).toHaveProperty('id');
        categoryId = body.id;
        expect(body.name).toBe('Category E2e');
      });
  });

  it('Debe actualizar una categoría', () => {
    return request(app.getHttpServer())
      .patch(`/categories/${categoryId}`)
      .set('Authorization', 'Bearer ' + accessToken)
      .send({
        name: 'Category E2e update',
      })
      .expect(200)
      .expect(({ body }) => {
        expect(body.id).toBe(categoryId);
        expect(body.name).toBe('Category E2e update');
      });
  });

  it('Debe eliminar una categoría', () => {
    return request(app.getHttpServer())
      .delete(`/categories/${categoryId}`)
      .set('Authorization', 'Bearer ' + accessToken)
      .expect(200)
      .expect(({ body }) => {
        expect(body.id).toBe(categoryId);
      });
  });

  it('Debe dar un listado de todas las órdenes en el sistema', () => {
    return request(app.getHttpServer())
      .get('/orders')
      .set('Authorization', 'Bearer ' + accessToken)
      .expect(200)
      .expect(({ body }) => {
        for (const order of body) {
          expect(order).toHaveProperty('id');
          expect(order).toHaveProperty('userId');
          expect(order).toHaveProperty('total');
          expect(order).toHaveProperty('status');
          expect(order).toHaveProperty('paymentIntent');
          expect(order).toHaveProperty('addressId');
        }
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
