import { UserResponseDto } from '../../users/dto/user-response.dto';

export class AuthResponseDto {
  user: UserResponseDto;
  message: string;

  constructor(user: UserResponseDto, message: string) {
    this.user = user;
    this.message = message;
  }
}

