import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AuthenticationService } from './services/authentication.service';
import { LoginDto, SignupDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/loginResponse.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PermissionsGuard } from 'src/common/security/permissions.guard';
import { Permissions } from 'src/common/security/permissions.decorator';

@ApiTags('Authentication')
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) { }


  @Post('login')
  login(@Body() request: LoginDto): Promise<LoginResponseDto> {
    return this.authenticationService.login(request);
  }

  @Post('signup')
  register(@Body() request: SignupDto): Promise<LoginResponseDto> {
    console.log('this is the request: ', request);
    return this.authenticationService.signup(request);
  }

  // get all profiles
  @Get('users')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Permissions('read_users', 'test2')
  getAllUsers() {
    return this.authenticationService.getAllUsers();
  }

  // get all profiles
  @Get('profiles')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  getAllProfiles() {
    return this.authenticationService.getAllProfiles();
  }

  // get all permissions
  @Get('permissions')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  getAllPermissions() {
    return this.authenticationService.getAllPermissions();
  }

}
