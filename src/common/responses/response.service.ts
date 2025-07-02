import { Injectable } from '@nestjs/common';

@Injectable()
export class ResponseService {
  success<T>(message: string, data: T) {
    return {
      success: true,
      message,
      data,
    };
  }

  error(message: string, data?: any) {
    return {
      success: false,
      message,
      data,
    };
  }
}
