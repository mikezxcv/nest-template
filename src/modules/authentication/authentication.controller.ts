import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AuthenticationService } from './services/authentication.service';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/loginResponse.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  findAll() {
    return this.authenticationService.findAll();
  }

  @Post('login')
  login(@Body() request: LoginDto): Promise<LoginResponseDto> {
    return this.authenticationService.login(request);
  }
}
