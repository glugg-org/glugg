'use client';

import { useTranslations } from 'next-intl';
import {
  Button,
  Field,
  Fieldset,
  Form,
  Radio,
  RadioGroup,
} from '@base-ui/react';
import { Locale, locales } from '@/i18n/locales';

import { QuickplayRequest, quickplayRequestSchema } from '@glugg/shared';
import { Controller, useForm } from 'react-hook-form';
import { LocaleButton } from '@/lib/components/LocalePicker';
import { zodResolver } from '@hookform/resolvers/zod';

export function QuickplayForm({ locale }: { locale: Locale }) {
  const t = useTranslations('Quickplay');
  const langT = useTranslations('Languages');

  const { control, handleSubmit } = useForm<QuickplayRequest>({
    defaultValues: {
      gameLanguage: locale,
    },
    resolver: zodResolver(quickplayRequestSchema),
  });

  function submitForm(data: QuickplayRequest) {
    console.log(data);
  }

  const sortedLocales = [locale, ...locales.filter((l) => l !== locale)];

  return (
    <Form
      aria-label={t('title')}
      className="centered-flex flex-col gap-8 xl:min-w-120"
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit(submitForm)}
    >
      <Controller
        name="gameLanguage"
        control={control}
        render={({
          field: { ref, name, value, onBlur, onChange },
          fieldState: { invalid, isTouched, isDirty },
        }) => (
          <Field.Root
            name={name}
            invalid={invalid}
            touched={isTouched}
            dirty={isDirty}
          >
            <Fieldset.Root
              render={
                <RadioGroup
                  className="centered-flex flex-col gap-6"
                  value={value}
                  onValueChange={onChange}
                  inputRef={ref}
                />
              }
            >
              <Fieldset.Legend className="">
                <div className="centered-flex flex-col text-2xl xl:text-4xl">
                  <h1>
                    {t('gameLanguage')}: {langT(value as string)}
                  </h1>
                  <div className="parchment-orange-500/30 hover:parchment-orange-500/45 transition-colors duration-200 w-full scale-x-120 h-[1.13em] -mt-[0.85em]" />
                </div>
              </Fieldset.Legend>
              <div className="centered-flex gap-8">
                {sortedLocales.map((l) => (
                  <Field.Item className="size-20" key={l}>
                    <Field.Label aria-label={langT(l)}>
                      <Radio.Root value={l} onBlur={onBlur}>
                        <Radio.Indicator />
                      </Radio.Root>
                      <LocaleButton
                        locale={l}
                        className={value === l ? 'scale-110 saturate-120' : ''}
                      />
                    </Field.Label>
                  </Field.Item>
                ))}
              </div>
            </Fieldset.Root>
          </Field.Root>
        )}
      />

      <Button
        type="submit"
        className="text-3xl parchment-amber-200/90 hover:parchment-amber-300/65 px-10 py-3 min-w-40 text-center text-amber-950 xl:text-5xl xl:min-w-70 xl:py-6 hover-grow"
      >
        {t('search')}
      </Button>
    </Form>
  );
}
