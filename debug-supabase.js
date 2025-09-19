// Debug script to test Supabase connection and schema
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables!');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function debugSupabase() {
  console.log('🔍 Debugging Supabase connection...\n');

  try {
    // Test 1: Check if we can connect
    console.log('1. Testing connection...');
    const { data: testData, error: testError } = await supabase
      .from('incidents')
      .select('count')
      .limit(1);
    
    if (testError) {
      console.error('❌ Connection error:', testError);
      return;
    }
    console.log('✅ Connection successful');

    // Test 2: Check table structure
    console.log('\n2. Checking table structure...');
    try {
      const { data: columns, error: columnsError } = await supabase
        .from('incidents')
        .select('*')
        .limit(0);

      if (columnsError) {
        console.log('ℹ️  Could not get column info, but table exists');
      } else {
        console.log('✅ Table structure accessible');
      }
    } catch (err) {
      console.log('ℹ️  Table structure check skipped');
    }

    // Test 3: Try to create a minimal incident
    console.log('\n3. Testing incident creation...');
    const testIncident = {
      date: '2024-01-15',
      time: '14:30:00',
      type: 'otro',
      severity: 'media',
      status: 'pendiente',
      location: 'Test Location',
      camera: 'CAM-TEST',
      description: 'Test incident for debugging',
      reported_by: 'Test User'
    };

    console.log('📤 Sending data:', JSON.stringify(testIncident, null, 2));

    const { data: newIncident, error: createError } = await supabase
      .from('incidents')
      .insert([testIncident])
      .select()
      .single();

    if (createError) {
      console.error('❌ Creation error:', createError);
      console.error('Error details:', JSON.stringify(createError, null, 2));
    } else {
      console.log('✅ Incident created successfully:', newIncident);
      
      // Clean up
      await supabase
        .from('incidents')
        .delete()
        .eq('id', newIncident.id);
      console.log('🧹 Test incident cleaned up');
    }

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

debugSupabase();
