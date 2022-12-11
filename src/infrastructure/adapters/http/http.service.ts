import { Injectable } from '@nestjs/common';
import { HttpAdapter, HttpHeaders } from 'src/domain/adapters/http.adapter';
import axios from 'axios';

@Injectable()
export class HttpService extends HttpAdapter {
    async get<T>(url: string, headers: HttpHeaders): Promise<T> {
        const response = await axios.get(url, { headers });
        return response.data; 
    }

    async post<T>(url: string, body: any, headers: HttpHeaders): Promise<T> {
        const response = await axios.post(url, { headers, body });
        return response.data;
    }
    
}
