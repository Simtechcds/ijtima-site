-- Create table to cache NATIONAL events from Baserow table 641352
CREATE TABLE public.baserow_national_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  baserow_id TEXT NOT NULL UNIQUE,
  year TEXT,
  city TEXT,
  region TEXT,
  title TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'national',
  type TEXT NOT NULL DEFAULT 'national',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  synced_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create sync status table to track sync operations
CREATE TABLE public.sync_status (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  table_name TEXT NOT NULL,
  last_sync_at TIMESTAMP WITH TIME ZONE,
  records_synced INTEGER DEFAULT 0,
  status TEXT DEFAULT 'idle', -- idle, running, success, error
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.baserow_national_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sync_status ENABLE ROW LEVEL SECURITY;

-- Create policies (public read access for now since this is display data)
CREATE POLICY "National events are viewable by everyone" 
ON public.baserow_national_events 
FOR SELECT 
USING (true);

CREATE POLICY "Sync status is viewable by everyone" 
ON public.sync_status 
FOR SELECT 
USING (true);

-- Create indexes for better performance
CREATE INDEX idx_baserow_national_events_baserow_id ON public.baserow_national_events(baserow_id);
CREATE INDEX idx_baserow_national_events_category ON public.baserow_national_events(category);
CREATE INDEX idx_baserow_national_events_title ON public.baserow_national_events(title);
CREATE INDEX idx_sync_status_table_name ON public.sync_status(table_name);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_baserow_national_events_updated_at
  BEFORE UPDATE ON public.baserow_national_events
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_sync_status_updated_at
  BEFORE UPDATE ON public.sync_status
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();