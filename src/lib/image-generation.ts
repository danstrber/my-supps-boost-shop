
import { supabase } from '@/integrations/supabase/client';

export const generateAromasinImage = async (): Promise<string | null> => {
  try {
    console.log('Generating Aromasin image...');
    
    const { data, error } = await supabase.functions.invoke('generate-aromasin-image');
    
    if (error) {
      console.error('Error generating image:', error);
      return null;
    }
    
    if (data?.success && data?.image) {
      console.log('Image generated successfully');
      return data.image;
    }
    
    console.error('Image generation failed:', data);
    return null;
  } catch (error) {
    console.error('Unexpected error generating image:', error);
    return null;
  }
};
