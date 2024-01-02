import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { EmailEhUnico } from '../validacao/email-eh-unico';

export class CriaUsuarioDTO {
  @IsNotEmpty({ message: 'O campo nome é obrigatório' })
  nome: string;

  @IsEmail(undefined, { message: 'O campo email deve ser um email válido' })
  @EmailEhUnico({ message: 'Já existe um usuário com esse email' })
  email: string;

  @MinLength(6, { message: 'O campo senha deve conter no mínimo 6 caracteres' })
  senha: string;
}
