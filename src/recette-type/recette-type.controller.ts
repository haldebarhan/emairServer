import { Controller, Get } from '@nestjs/common';
import { RecetteTypeService } from './recette-type.service';

@Controller('recette-type')
export class RecetteTypeController {
    constructor(private readonly rt_service: RecetteTypeService){}
    @Get()
    async getAll(){
        const results = await this.rt_service.getAll()
        return results
    }
}
