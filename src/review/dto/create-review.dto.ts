import { IsString, IsInt, Max, Min} from 'class-validator';

export class CreateReviewDto {
  @IsString()
  name: string;  

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsInt()
  @Max(5)
  @Min(1)
  rating: number;

  @IsString()
  productId: string;
}