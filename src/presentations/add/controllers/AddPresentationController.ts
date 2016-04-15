import {AddPresentationService} from '../services/AddPresentationService';
import {AddPresentationViewModel} from '../models/AddPresentationViewModel';

import '../services/AddPresentationService';
export class AddPresentationController {
    static $inject = ['$mdDialog','AddPresentationService'];
    
    topic: string;
    description: string;
    files: File[];
    form: angular.IFormController;
    isSaving: boolean;
    
    get canSave(): boolean {
        return this.form 
            && this.form.$valid;
    }
    
    constructor(private $mdDialog: angular.material.IDialogService,
        private addPresentationService: AddPresentationService) {
        this.files = [];
    }
    
    cancel(): void {
        this.$mdDialog.cancel();
    }
    
    save(): void {
        if (!this.form.$valid)
            return;
        
        this.isSaving = true;
        const viewModel: AddPresentationViewModel = {
            topic: this.topic,
            description: this.description,
            files: this.files
        };
        this.addPresentationService.save(viewModel).then((id) => {
            viewModel.id = id;
            this.$mdDialog.hide(viewModel);
            this.isSaving = false;
        });
    }
    
    selectFiles(files: File[]): void {
        this.files = files;
    }
    
    removeFile(file: File): void {
        const index = this.files.indexOf(file);
        if (index > -1) 
            this.files.splice(index, 1);
    }
}