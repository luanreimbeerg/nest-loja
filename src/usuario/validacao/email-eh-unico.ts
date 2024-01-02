import { UsuarioRepository } from '../usuario.repository';
import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidatorConstraint,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailEhUnicoValidator implements ValidatorConstraintInterface {
  constructor(private usuarioRepository: UsuarioRepository) {}
  async validate(
    value: any,
    validatorArguments?: ValidationArguments,
  ): Promise<boolean> {
    const user = await this.usuarioRepository.existeComEmail(value);
    return !user;
  }
}

export const EmailEhUnico = (validationOptions?: ValidationOptions) => {

    return (objeto: Object, propreidade: string) => {
        registerDecorator({
            name: 'EmailEhUnico',
            target: objeto.constructor,
            propertyName: propreidade,
            constraints: [],
            options: validationOptions,
            validator: EmailEhUnicoValidator,
        })
    }
};
