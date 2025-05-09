import { ApiProperty } from "@nestjs/swagger";

export class AppDto<T> {
    @ApiProperty()
    code: number;
  
    @ApiProperty()
    status: boolean;
  
    @ApiProperty()
    message: string;
  
    @ApiProperty({ required: false })
    data?: T;
  
    constructor(code: number, message: string, data?: T) {
      this.code = code;
      this.status = code < 400 ? true : false;
      this.message = message;
      if (data !== undefined) {
        this.data = data;
      }
    }
  }
  