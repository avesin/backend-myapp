import { Body, Controller, Get, Put, UseGuards } from "@nestjs/common";
import { InterestService } from "./interest.service";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { GetUser } from '../common/decorators/get-user.decorator';
import { AppDto } from "src/app.dto";
import { UpdateInterestsDto } from "./dto/update-interest.dto";


@ApiTags('Interest')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('api')
export class InterestController {
    constructor(private readonly service: InterestService) { }

    @Put('interest')
    @ApiResponse({ status: 200, description: 'Interest successfully update' })
    async updateInterests(@GetUser() user, @Body() dto: UpdateInterestsDto) {
        const data = await this.service.updateInterests(user.userId, dto.values);
        return user ? new AppDto(200, "Interest found", { values: data.values }) : { message: 'Interest not found' };
    }

     @Get('interest')
    @ApiResponse({ status: 200, description: 'Interest successfully update' })
    async getInterests(@GetUser() user) {
        const data = await this.service.getInterests(user.userId);
        return user ? new AppDto(200, "Interest found", { values: data.values }) : { message: 'Interest nottt found' };
    }
}