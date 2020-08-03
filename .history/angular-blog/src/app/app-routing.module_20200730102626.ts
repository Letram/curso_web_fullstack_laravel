import { PostDetailsComponent } from './pages/post-details/post-details.component';
import { PostsComponent } from './pages/posts/posts.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { ErrorComponent } from './pages/error/error.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { PostsByCategoryComponent } from './pages/posts-by-category/posts-by-category.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'settings', component: EditUserComponent },
  {
    path: 'categories',
    children: [
      { path: '', component: CategoriesComponent },
      { path: ':id/posts', component: PostsByCategoryComponent },
    ],
  },
  {
    path: 'posts',
    children: [
      { path: '', component: PostsComponent },
      { path: 'create', component: CreatePostComponent },
      { path: ':id', component: PostDetailsComponent },
      { path: 'edit/:id', component: CreatePostComponent },
    ],
  },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
