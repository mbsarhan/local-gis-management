import { control_administration as PrismaControlAdmin } from '@prisma/client';
import { ControlAdministrationEntity } from '../../domain/entities/control-administration.entity';

export class ControlAdministrationMapper {
  static toDomain(raw: any): ControlAdministrationEntity {
    // استخراج الوحدات القياسية من الـ Nested Include الذي عرفناه في الـ Repository
    const units = raw.community?.community_unit;

    return new ControlAdministrationEntity(
      raw.id,                                     // id
      raw.id_community,                           // id_community
      raw.id_type_regulatory_area,                // id_type_regulatory_area
      
      // منطق الـ Fallback: نأخذ من جدول الوحدات أولاً، وإذا لم يوجد نأخذ القيمة من جدول الضابطة
      units?.id_unit_minimum_property_area ?? (raw.minimum_property_area ? Number(raw.minimum_property_area) : null),
      units?.id_unit_maximum_property_area ?? (raw.maximum_property_area ? Number(raw.maximum_property_area) : null),
      
      raw.construction_ratio ? Number(raw.construction_ratio) : null,
      
      units?.id_unit_minimum_interface ?? (raw.minimum_interface ? Number(raw.minimum_interface) : null),
      
      raw.number_of_floors,
      
      units?.id_unit_height ?? (raw.height ? Number(raw.height) : null),
      units?.id_unit_front_duties ?? (raw.front_duties ? Number(raw.front_duties) : null),
      units?.id_unit_back_duties ?? (raw.back_duties ? Number(raw.back_duties) : null),
      units?.id_unit_side_duties ?? (raw.side_duties ? Number(raw.side_duties) : null),
      
      raw.notes,
      raw.id_who,
      raw.height_of_ground_floors ? Number(raw.height_of_ground_floors) : null,
      raw.investment_factor ? Number(raw.investment_factor) : null,

      // الحقول الإضافية التي أضفتها في الـ Entity (Optional fields)
      raw.community?.community_name,              // community_name
      raw.type_regulatory_area?.name              // type_regulatory_area_name
    );
  }

  static toPersistence(entity: ControlAdministrationEntity): Partial<PrismaControlAdmin> {
    return {
      // هنا نخزن المعرفات فقط في جدول الضابطة الأساسي
      id_community: entity.id_community,
      id_type_regulatory_area: entity.id_type_regulatory_area,
      
      // نستخدم as any لأن Prisma يتوقع Decimal في بعض الحقول ونحن نمرر number
      minimum_property_area: entity.minimum_property_area as any,
      maximum_property_area: entity.maximum_property_area as any,
      construction_ratio: entity.construction_ratio as any,
      minimum_interface: entity.minimum_interface as any,
      number_of_floors: entity.number_of_floors,
      height: entity.height as any,
      front_duties: entity.front_duties as any,
      back_duties: entity.back_duties as any,
      side_duties: entity.side_duties as any,
      
      notes: entity.notes,
      id_who: entity.id_who,
      height_of_ground_floors: entity.height_of_ground_floors as any,
      investment_factor: entity.investment_factor as any,
    };
  }
}