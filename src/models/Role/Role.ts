import { Model } from '@react3l/react3l/core';
import { Status } from 'models/Status';
import { AppUserRoleMapping } from 'models/AppUserRoleMapping';
import { Permission } from 'models/Permission';

export class Role extends Model
{
    public id?: number;

    public code?: string;

    public name?: string;

    public statusId?: number;

    public used?: boolean;


    public status?: Status;

    public appUserRoleMappings?: AppUserRoleMapping[];

    public permissions?: Permission[];
}
