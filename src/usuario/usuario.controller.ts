import { CriaUsuarioDTO } from './dto/CriaUsuario.dto';
import { ListaUsuarioDTO } from './dto/ListaUsuario.dto';
import { UsuarioEntity } from './usuario.entity';
import { UsuarioRepository } from './usuario.repository';
import { Body, Controller, Get, Post } from '@nestjs/common';

import { v4 as uuid } from 'uuid';

@Controller('/usuarios')
export class UsuarioController {
  constructor(private usuarioRepository: UsuarioRepository) {}
  @Post()
  async criaUsuario(@Body() dadosDoUsuario: CriaUsuarioDTO) {
    const newUser = new UsuarioEntity();
    newUser.nome = dadosDoUsuario.nome;
    newUser.email = dadosDoUsuario.email;
    newUser.senha = dadosDoUsuario.senha;
    newUser.id = uuid();

    this.usuarioRepository.salvar(newUser);

    return {
      usuario: new ListaUsuarioDTO(newUser.id, newUser.nome),
      message: 'Usuário criado com sucesso!',
    };
  }

  @Get()
  async listaUsuarios() {
    const usuariosSalvos = await this.usuarioRepository.listar();

    const usuariosLista = usuariosSalvos.map(
      (usuario) => new ListaUsuarioDTO(usuario.id, usuario.nome),
    );

    return usuariosLista;
  }
}
