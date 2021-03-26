import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  NbThemeModule,
  NbIconModule,
  NbButtonModule,
  NbA11yModule,
  NbAccordionModule,
  NbActionsModule,
  NbAlertModule,
  NbAutocompleteModule,
  NbBadgeModule,
  NbBaseCalendarModule,
  NbBidiModule,
  NbCalendarKitModule,
  NbCalendarModule,
  NbCalendarRangeModule,
  NbCardModule,
  NbCdkAdapterModule,
  NbCdkMappingModule,
  NbChatModule,
  NbCheckboxModule,
  NbContextMenuModule,
  NbDatepickerModule,
  NbDialogModule,
  NbFormFieldModule,
  NbInputModule,
  NbLayoutModule,
  NbListModule,
  NbMenuModule,
  NbOptionModule,
  NbOverlayModule,
  NbPopoverModule,
  NbProgressBarModule,
  NbRadioModule,
  NbRouteTabsetModule,
  NbSearchModule,
  NbSelectModule,
  NbSidebarModule,
  NbSpinnerModule,
  NbStepperModule,
  NbTableModule,
  NbTabsetModule,
  NbTimepickerModule,
  NbToastrModule,
  NbToggleModule,
  NbTooltipModule,
  NbTreeGridModule,
  NbUserModule,
  NbWindowModule,
} from '@nebular/theme';

import {
  NbEvaIconsModule
} from '@nebular/eva-icons';

import { NbDateFnsDateModule } from '@nebular/date-fns';
import { vi } from 'date-fns/locale';
export const NEBULAR_MODULES = [
  NbIconModule,
  NbButtonModule,
  NbA11yModule,
  NbAccordionModule,
  NbActionsModule,
  NbAlertModule,
  NbAutocompleteModule,
  NbBadgeModule,
  NbBaseCalendarModule,
  NbBidiModule,
  NbCalendarKitModule,
  NbCalendarModule,
  NbCalendarRangeModule,
  NbCardModule,
  NbCdkAdapterModule,
  NbCdkMappingModule,
  NbChatModule,
  NbCheckboxModule,
  NbContextMenuModule,
  NbDatepickerModule,
  NbDialogModule,
  NbFormFieldModule,
  NbInputModule,
  NbLayoutModule,
  NbListModule,
  NbMenuModule,
  NbOptionModule,
  NbOverlayModule,
  NbPopoverModule,
  NbProgressBarModule,
  NbRadioModule,
  NbRouteTabsetModule,
  NbSearchModule,
  NbSelectModule,
  NbSidebarModule,
  NbSpinnerModule,
  NbStepperModule,
  NbTableModule,
  NbTabsetModule,
  NbTimepickerModule,
  NbToastrModule,
  NbToggleModule,
  NbTreeGridModule,
  NbUserModule,
  NbWindowModule,
  NbEvaIconsModule,
  NbTooltipModule
];

@NgModule({
  exports: [...NEBULAR_MODULES]
})
export class NebularModule {
  static forRoot(): ModuleWithProviders<NebularModule> {
    return {
      ngModule: NebularModule,
      providers: [
        ...NbThemeModule.forRoot({ name: 'default' }).providers,
        ...NbSidebarModule.forRoot().providers,
        ...NbMenuModule.forRoot().providers,
        ...NbDatepickerModule.forRoot().providers,
        ...NbDialogModule.forRoot().providers,
        ...NbWindowModule.forRoot().providers,
        ...NbToastrModule.forRoot().providers,
        ...NbTimepickerModule.forRoot().providers,
      ]
    };
  }
  static forChild(): ModuleWithProviders<NebularModule> {
    return {
      ngModule: NebularModule,
      providers: [
        // ...NbThemeModule.forRoot({ name: 'default' }).providers,
        // ...NbSidebarModule.forRoot().providers,
        // ...NbMenuModule.forRoot().providers,
        // ...NbDatepickerModule.().providers,
        ...NbDateFnsDateModule.forRoot({
            parseOptions: { locale: vi, awareOfUnicodeTokens: true },
            formatOptions: { locale: vi, awareOfUnicodeTokens: true }
          }).providers,
        ...NbDialogModule.forChild().providers,
        ...NbWindowModule.forChild().providers,
        // ...NbToastrModule.forRoot().providers,
      ]
    };
  }
}
