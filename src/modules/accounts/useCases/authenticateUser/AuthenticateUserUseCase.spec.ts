import { AppError } from '@errors/AppError';
import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { UsersRepositoryFake } from '@modules/accounts/repositories/fakes/UsersRepositoryFake';

import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let usersRepositoryFake: UsersRepositoryFake;
let createUserUseCase: CreateUserUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryFake = new UsersRepositoryFake();
    createUserUseCase = new CreateUserUseCase(usersRepositoryFake);
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryFake);
  });

  it('should be able to authenticate an user', async () => {
    const newUser: ICreateUserDTO = {
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      password: '1234',
      driver_license: '123456',
    };

    await createUserUseCase.execute(newUser);

    const response = await authenticateUserUseCase.execute({
      email: newUser.email,
      password: newUser.password,
    });

    expect(response).toHaveProperty('token');
  });

  it('should not be able to authenticate an non existent user', () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'false@gmail.com',
        password: '1234',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with incorrect password', () => {
    expect(async () => {
      const newUser: ICreateUserDTO = {
        name: 'John Three',
        email: 'john.three@gmail.com',
        password: '1234',
        driver_license: '654321',
      };

      await createUserUseCase.execute(newUser);

      await authenticateUserUseCase.execute({
        email: newUser.email,
        password: 'incorrectPassword',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
