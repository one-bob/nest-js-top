import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';

export const getMongoConfig = async (
  configService: ConfigService,
): Promise<MongooseModuleOptions> => {
  return {
    uri: getMongoString(configService),
  };
};

const getMongoString = (configService: ConfigService) => {
  const MONGO_LOGIN = configService.get('MONGO_LOGIN');
  const MONGO_PASSWORD = configService.get('MONGO_PASSWORD');
  const MONGO_HOST = configService.get('MONGO_HOST');
  const MONGO_PORT = configService.get('MONGO_PORT');
  const MONGO_AUTHDATABASE = configService.get('MONGO_AUTHDATABASE');

  return `mongodb://${MONGO_LOGIN}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_AUTHDATABASE}`;
};
