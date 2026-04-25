import { ControlAdministrationEntity } from '../entities/control-administration.entity';

export abstract class IControlAdministrationRepository {
    
    abstract create(data: ControlAdministrationEntity): Promise<ControlAdministrationEntity>;

    abstract update(id: number, data: Partial<ControlAdministrationEntity>): Promise<ControlAdministrationEntity>;

    abstract findAll(): Promise<ControlAdministrationEntity[]>;

    
    abstract findById(id: number): Promise<ControlAdministrationEntity | null>;

    
    abstract findByCommunity(communityId: number): Promise<ControlAdministrationEntity[]>;

   
    abstract delete(id: number): Promise<boolean>;
}