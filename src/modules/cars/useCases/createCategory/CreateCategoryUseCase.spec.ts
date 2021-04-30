import { AppError } from '../../../../errors/AppError';
import { CategoriesRepositoryFake } from '../../repositories/fakes/CategoriesRepositoryFake';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

let categoriesRepositoryFake: CategoriesRepositoryFake;
let createCategoryUseCase: CreateCategoryUseCase;

describe('Create Category', () => {
  beforeEach(() => {
    categoriesRepositoryFake = new CategoriesRepositoryFake();
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryFake);
  });

  it('should be able to create a new category', async () => {
    const newCategory = {
      name: 'New Category',
      description: 'Category description',
    };

    await createCategoryUseCase.execute({
      name: newCategory.name,
      description: newCategory.description,
    });

    const category = await categoriesRepositoryFake.findByName(
      newCategory.name,
    );

    expect(category).toHaveProperty('id');
  });

  it('should not be able to create a new category with name exists', async () => {
    expect(async () => {
      const newCategory = {
        name: 'New Category',
        description: 'Category description',
      };

      await createCategoryUseCase.execute({
        name: newCategory.name,
        description: newCategory.description,
      });

      await createCategoryUseCase.execute({
        name: newCategory.name,
        description: newCategory.description,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
