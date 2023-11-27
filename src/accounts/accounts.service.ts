import { Injectable } from '@nestjs/common';
import { LoginRequestDto } from './dto/login.request.dto';
import { LoginResponseDto } from './dto/login.response.dto';
import { UserModel, UserRole } from 'src/core/models/UserModel';
import { JwtTokenService } from 'src/core/JwtTokenService';
import { SignupRequestDto } from './dto/signup.request.dto';
import { SignupResponseDto } from './dto/signup.response.dto';

@Injectable()
export class AccountsService {
  private readonly userModel: typeof UserModel = UserModel;
  constructor(private readonly jwtService: JwtTokenService) {}

  async login(dto: LoginRequestDto): Promise<LoginResponseDto> {
    const account = await this.userModel.findOne({ email: dto.email });
    if (!account) throw new Error('Invalid credentials provided.');

    const token = await this.jwtService.create(account.id);
    return { fullname: account.fullname, token: token };
  }

  async signup(dto: SignupRequestDto): Promise<SignupResponseDto> {
    const account = await this.userModel.findOne({ email: dto.email });
    if (!!account) {
      throw new Error('Account with provided email already exists.');
    }

    await this.userModel.create({
      fullname: dto.fullname,
      email: dto.email,
      password: dto.password,
      roles: [UserRole.BasicAccount],
    });

    return { success: true };
  }
}
