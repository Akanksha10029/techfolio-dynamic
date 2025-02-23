
import { createClient } from '@supabase/supabase-js';

// Using the pre-configured client from the integrations folder
import { supabase as configuredClient } from '@/integrations/supabase/client';

export const supabase = configuredClient;
