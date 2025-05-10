'use server';

import { LoadingScreen } from '@/components/loading-screen';

// List of loading texts
const loadingTexts = [
  'Packing up your digital bags...',
  'Turning off all the lights...',
  'Saying goodbye to the server...',
  'Wiping footprints in the sand...',
  'Untangling your web session...',
  'Folding your virtual agent...',
  'Closing the virtual doorway...',
  'Sending farewells via pigeons...',
  'Powering down the processors...',
];

export default async function RefreshPage() {
  const randomText =
    loadingTexts[Math.floor(Math.random() * loadingTexts.length)];
  return <LoadingScreen text={randomText} />;
}
