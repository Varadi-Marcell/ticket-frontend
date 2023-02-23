import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface EntityService {
  getEntityById(id: number): Observable<any>;
}
