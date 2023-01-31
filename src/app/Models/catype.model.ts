import { CAStep } from './castep.model';

export interface CAType {
    id: number;
    CAName: string;
    CASteps: CAStep[];
}
