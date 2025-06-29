import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  // POST /reviews - Create a new review
  @Post()
  @ApiOperation({ summary: 'Create a new review' })
  @ApiResponse({ status: 201, description: 'Review created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.create(createReviewDto);
  }

  // GET /reviews/:userId - Retrieve all reviews for a specific user
  @Get(':userId')
  @ApiOperation({ summary: 'Retrieve all reviews for a specific user' })
  @ApiParam({
    name: 'userId',
    description: 'ID of the user whose reviews you want to fetch',
    type: String,
  })
  @ApiResponse({ status: 200, description: 'List of reviews for the user.' })
  @ApiResponse({
    status: 404,
    description: 'User not found or no reviews available.',
  })
  findOne(@Param('userId') userId: string) {
    return this.reviewsService.findOne(userId);
  }
}
