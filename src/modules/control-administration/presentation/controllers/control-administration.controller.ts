import { 
  Controller, 
  Get, 
  Post, 
  Patch,
  Delete, 
  Body, 
  Param, 
  Req,
  UseGuards,
  UsePipes,
  HttpCode, 
  HttpStatus, 
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';

import { GetAllControlsUseCase } from '../../application/use-cases/get-all-control-admin.use-case';
import { CreateControlUseCase } from '../../application/use-cases/create-control-admin.use-case';
import { UpdateControlUseCase } from '../../application/use-cases/update-control-admin.use-case';
import { DeleteControlUseCase } from '../../application/use-cases/delete-control-admin.use-case';
import { GetByCommunityUseCase } from '../../application/use-cases/get-by-community.use-case';
import { CreateControlAdminDto } from '../dto/create-control-admin.dto';
import { UpdateControlAdminDto } from '../dto/update-control-admin.dto';
import { AuthGuard } from '../../../../shared/guards/auth.guard';
@Controller('control-administration')
@ApiTags('Control Administration')
@UseGuards(AuthGuard)
@ApiBearerAuth('access-token')
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true }))
export class ControlAdministrationController {
  constructor(
    private readonly getAllControlsUseCase: GetAllControlsUseCase,
    private readonly createControlUseCase: CreateControlUseCase,
    private readonly updateControlUseCase: UpdateControlUseCase,
    private readonly deleteControlUseCase: DeleteControlUseCase,
    private readonly getByCommunityUseCase: GetByCommunityUseCase,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'جلب جميع الضوابط التنظيمية', description: 'محمي: يتطلب Bearer access token' })
  @ApiResponse({ status: 200, description: 'تمت العملية بنجاح' })
  async getAll() {
    return await this.getAllControlsUseCase.execute();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'إنشاء ضابطة تنظيمية جديدة', description: 'محمي: يتطلب Bearer access token. يتم تسجيل id_who تلقائياً من التوكن.' })
  @ApiBody({ type: CreateControlAdminDto })
  @ApiResponse({ status: 201, description: 'تم إنشاء الضابطة بنجاح' })
  @ApiResponse({ status: 400, description: 'بيانات غير صحيحة' })
  async create(@Req() req: any, @Body() createDto: CreateControlAdminDto) { 
    return await this.createControlUseCase.execute(req.userId, createDto);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'تحديث ضابطة تنظيمية', description: 'محمي: يتطلب Bearer access token. يتم تسجيل id_who تلقائياً من التوكن.' })
  @ApiParam({ name: 'id', type: Number, description: 'معرّف الضابطة' })
  @ApiBody({ type: UpdateControlAdminDto })
  @ApiResponse({ status: 200, description: 'تم تحديث الضابطة بنجاح' })
  @ApiResponse({ status: 404, description: 'الضابطة غير موجودة' })
  async update(
    @Req() req: any,
    @Param('id', ParseIntPipe) id: number, 
    @Body() updateDto: UpdateControlAdminDto
  ) {
    return await this.updateControlUseCase.execute(req.userId, id, updateDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // تعيد 204 في حال النجاح بدون محتوى
  @ApiOperation({ summary: 'حذف ضابطة تنظيمية', description: 'محمي: يتطلب Bearer access token' })
  @ApiParam({ name: 'id', type: Number, description: 'معرّف الضابطة' })
  @ApiResponse({ status: 204, description: 'تم حذف الضابطة بنجاح' })
  @ApiResponse({ status: 404, description: 'الضابطة غير موجودة' })
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.deleteControlUseCase.execute(id);
  }

  @Get('community/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'جلب الضوابط حسب المجتمع', description: 'محمي: يتطلب Bearer access token' })
  @ApiParam({ name: 'id', type: Number, description: 'معرّف المجتمع' })
  @ApiResponse({ status: 200, description: 'تمت العملية بنجاح' })
  async getByCommunity(@Param('id', ParseIntPipe) communityId: number) {
    return await this.getByCommunityUseCase.execute(communityId);
  }
}
