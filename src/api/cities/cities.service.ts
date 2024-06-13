import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { CityEntity } from 'src/api/cities/entities/city.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(CityEntity)
    private cityRepository: Repository<CityEntity>,
  ) {}

  async create(createCityDto: CreateCityDto) {
    const city = this.cityRepository.create(createCityDto);
    const save = await this.cityRepository.save(city);
    return save;
  }

  async findAll() {
    return await this.cityRepository.find();
  }

  async findOne(id: number) {
    return this.cityRepository.findOne({ where: { id } });
  }

  async update(id: number, updateCityDto: UpdateCityDto) {
    const city = await this.findOne(id);
    if (!city) throw new HttpException('city not found!', HttpStatus.NOT_FOUND);
    await this.cityRepository.update(id, updateCityDto);
    return await this.findOne(id);
  }

  async remove(id: number) {
    const city = await this.findOne(id);
    if (!city) throw new HttpException('city not found!', HttpStatus.NOT_FOUND);
    await this.cityRepository.remove(city);
    return { message: 'Remove success' };
  }
}
