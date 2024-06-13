import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

@Injectable()
export class BaseService {
  constructor(
    @InjectEntityManager() protected readonly entityManager: EntityManager,
  ) {}
}
