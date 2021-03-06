import {ToolbarDirective} from './ToolbarDirective';
import {ToolbarController} from './controllers/ToolbarController';

describe('ToolbarDirective', () => {
    let $injector: angular.auto.IInjectorService;
    let directive: ToolbarDirective;
    
    beforeEach(angular.mock.module('sogeti-academy'));
    
    beforeEach(angular.mock.inject((_$injector_) => {
        $injector = _$injector_;
        directive = new ToolbarDirective();
    }));
    
    it('should register with angular', () => {
        expect($injector.has('toolbarDirective')).toBeTruthy();
    });
    
    it('should isolate scope', () => {
        expect(directive.scope).toEqual({});
    });
    
    it('should specify controller', () => {
        expect(directive.controller).toBe(ToolbarController);
    });
    
    it('should specify controller as', () => {
        expect(directive.controllerAs).toBe('$toolbar');
    });
    
    it('should specify template', () => {
        expect(directive.template).toBe(require('./templates/toolbar'));
    })
})