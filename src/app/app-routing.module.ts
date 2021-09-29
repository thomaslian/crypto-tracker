import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoinbaseComponent } from './pages/coinbase/coinbase.component';
import { MainComponent } from './pages/main/main.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'coinbase', component: CoinbaseComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }