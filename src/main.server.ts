import { bootstrapApplication, BootstrapContext } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { App } from './app/app';
import { config } from './app/app.config.server';

export default function bootstrap(context: BootstrapContext) {
  return bootstrapApplication(
    App,
    {
      ...config,
      providers: [
        ...(config.providers ?? []),
        provideHttpClient() // ✅ HttpClient for SSR
      ]
    },
    context // ✅ REQUIRED for SSR
  );
}
