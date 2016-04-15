import {INavigationState} from '../core/INavigationState';

import './root/PresentationsDirective';
export const PresentationsState: INavigationState = {
    name: 'presentations',
    url: '/presentations',
    template: '<presentations></presentations>',
    title: 'Presentations',
    order: 3
};

angular.module('sogeti-academy')
    .config([
        '$stateProvider',
        ($stateProvider: angular.ui.IStateProvider) => {
            $stateProvider.state(PresentationsState);
        }
    ]);