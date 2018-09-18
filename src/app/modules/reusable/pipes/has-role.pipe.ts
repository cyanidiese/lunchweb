import {Pipe, PipeTransform} from '@angular/core';

import {User} from '../../../classes/models/user';

@Pipe({
    name: 'hasRole'
})
export class HasRolePipe implements PipeTransform {

    transform(user: User, role: string): boolean {
        if(user && user.role && user.role.name){
            return user.role.name == role;
        }
        return false;
    }

}
