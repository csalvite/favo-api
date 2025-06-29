import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { UserAddressesModule } from './user-addresses/user-addresses.module';
import { CategoriesModule } from './categories/categories.module';
import { TasksModule } from './tasks/tasks.module';
import { StatusModule } from './status/status.module';
import { ProposalsModule } from './proposals/proposals.module';
import { AssignmentsModule } from './assignments/assignments.module';
import { MessagesModule } from './messages/messages.module';
import { ReviewsModule } from './reviews/reviews.module';
import { NotificationsModule } from './notifications/notifications.module';
import { MediaModule } from './media/media.module';
import { ReportsModule } from './reports/reports.module';

@Module({
  imports: [UsersModule, UserAddressesModule, CategoriesModule, TasksModule, StatusModule, ProposalsModule, AssignmentsModule, MessagesModule, ReviewsModule, NotificationsModule, MediaModule, ReportsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
