import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Exclude } from 'class-transformer';
import { IsUserAlreadyExist } from './is-name-unique.validator';

export class User {
  id: number;

  @IsNotEmpty({
    message: 'NomeDeUsuario é obrigatório.',
  })
  @IsString({
    message: 'NomeDeUsuario precisa ser uma string.',
  })
  @IsUserAlreadyExist({
    message: 'NomeDeUsuario já existe.',
  })
  name: string;

  @IsEmail(
    {},
    {
      message: 'Email inválido!',
    },
  )
  email: string;

  @Exclude({
    toPlainOnly: true,
  })
  @IsNotEmpty({
    message: 'Senha é obrigatório.',
  })
  password: string;

  @IsNotEmpty({
    message: 'Nome completo é obrigatório',
  })
  completeName: string;
  createdDate: Date;
}
