import { OrdersService } from './orders.service';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderEntity } from './entities/order.entity';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    findAll(): Promise<OrderEntity[]>;
    findAllForUser(userId: number): Promise<OrderEntity[]>;
    findOne(id: string): Promise<OrderEntity>;
    update(id: string, updateOrderDto: UpdateOrderDto): Promise<OrderEntity>;
    remove(id: string): Promise<OrderEntity>;
    findOneForUser(id: string, userId: number): Promise<OrderEntity>;
    updateOneForUser(id: string, userId: number, updateOrderDto: UpdateOrderDto): Promise<OrderEntity>;
    removeOneForUser(id: string, userId: number): Promise<OrderEntity>;
}
