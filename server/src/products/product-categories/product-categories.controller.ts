import { Controller, Post, Body, Delete, UseGuards } from '@nestjs/common';
import { ProductCategoriesService } from './product-categories.service';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { JwtAccessGuard } from 'src/auth/guards/jwt-access.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/users/constants/user-role';

@UseGuards(JwtAccessGuard, RoleGuard)
@Roles(UserRole.ADMIN)
@Controller('product-categories')
export class ProductCategoriesController {
  constructor(private readonly productCategoriesService: ProductCategoriesService) {}

  @Post()
  async create(@Body() createProductCategoryDto: CreateProductCategoryDto) {
    return this.productCategoriesService.create(createProductCategoryDto);
  }

  

  @Delete()
  async remove(@Body() createProductCategoryDto: CreateProductCategoryDto) {
    return this.productCategoriesService.remove(createProductCategoryDto);
  }
}
