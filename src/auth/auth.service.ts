
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(loginDto: LoginDto): Promise<{ access_token: string; user: any }> {
    // Buscar usuario por email
    const user = await this.usersService.findByEmail(loginDto.email);
    
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Verificar la contraseña
    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Crear el payload para el JWT
    const payload = { 
      sub: user.id, 
      email: user.email, 
      name: user.name,
      role: user.role.name,
      roleId: user.roleId
    };

    // Generar el token
    const access_token = await this.jwtService.signAsync(payload);

    // Retornar el token y la información del usuario (sin password)
    const { password, ...userWithoutPassword } = user;

    return {
      access_token,
      user: userWithoutPassword
    };
  }

  async validateUser(userId: number) {
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
