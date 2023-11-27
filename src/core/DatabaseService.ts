import { Injectable } from '@nestjs/common';
import mongoose from 'mongoose';

@Injectable()
export class DatabaseService {
  constructor() {}

  async connect(uri: string): Promise<void> {
    await mongoose.connect(uri);
  }
}
