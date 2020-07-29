import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { AngularFileUploaderModule } from "angular-file-uploader";
//components and pages
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { ErrorComponent } from './pages/error/error.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { UserImagePipe } from './pipes/user-image.pipe';
import { CategoriesComponent } from './pages/categories/categories.component';
import { CategoryEntryComponent } from './components/category-entry/category-entry.component';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { PostImagePipe } from './pipes/post-image.pipe';
import { PostsComponent } from './pages/posts/posts.component';
import { PostEntryComponent } from './components/post-entry/post-entry.component';
import { ClampPipe } from './pipes/clamp.pipe';
import { StriphtmlPipe } from './pipes/striphtml.pipe';
import { PostDetailsComponent } from './pages/post-details/post-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ErrorComponent,
    EditUserComponent,
    UserImagePipe,
    CategoriesComponent,
    CategoryEntryComponent,
    CreatePostComponent,
    PostImagePipe,
    PostsComponent,
    PostEntryComponent,
    ClampPipe,
    StriphtmlPipe,
    PostDetailsComponent
  ],
  imports: [
    BrowserModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    AngularFileUploaderModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
