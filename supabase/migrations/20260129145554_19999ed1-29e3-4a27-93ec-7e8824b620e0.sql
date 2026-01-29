-- Add RLS policy for authenticated users to read enquiries
CREATE POLICY "Authenticated users can view enquiries"
ON public.enquiries
FOR SELECT
TO authenticated
USING (true);

-- Add RLS policy for authenticated users to delete enquiries
CREATE POLICY "Authenticated users can delete enquiries"
ON public.enquiries
FOR DELETE
TO authenticated
USING (true);