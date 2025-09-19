// Test script to verify Supabase schema
// Run this with: node test-schema.js

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables!');
  console.log('Please create a .env file with:');
  console.log('REACT_APP_SUPABASE_URL=your_supabase_project_url');
  console.log('REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testSchema() {
  console.log('🧪 Testing Supabase Schema...\n');

  try {
    // Test 1: Check if incidents table exists and is accessible
    console.log('1. Testing table access...');
    const { data: incidents, error: fetchError } = await supabase
      .from('incidents')
      .select('*')
      .limit(1);
    
    if (fetchError) {
      console.error('❌ Error accessing incidents table:', fetchError.message);
      return;
    }
    console.log('✅ Incidents table is accessible');

    // Test 2: Test incident creation
    console.log('\n2. Testing incident creation...');
    const testIncident = {
      date: '2024-01-15',
      time: '14:30:00',
      type: 'otro',
      severity: 'media',
      status: 'pendiente',
      location: 'Test Location',
      camera: 'CAM-TEST',
      description: 'Test incident for schema validation',
      reported_by: 'Test User'
    };

    const { data: newIncident, error: createError } = await supabase
      .from('incidents')
      .insert([testIncident])
      .select()
      .single();

    if (createError) {
      console.error('❌ Error creating incident:', createError.message);
      return;
    }
    console.log('✅ Incident created successfully:', newIncident.incident_id);

    // Test 3: Test incident update
    console.log('\n3. Testing incident update...');
    const { data: updatedIncident, error: updateError } = await supabase
      .from('incidents')
      .update({ status: 'investigando' })
      .eq('id', newIncident.id)
      .select()
      .single();

    if (updateError) {
      console.error('❌ Error updating incident:', updateError.message);
      return;
    }
    console.log('✅ Incident updated successfully');

    // Test 4: Test search function
    console.log('\n4. Testing search function...');
    const { data: searchResults, error: searchError } = await supabase
      .rpc('search_incidents', { search_term: 'test' });

    if (searchError) {
      console.error('❌ Error searching incidents:', searchError.message);
      return;
    }
    console.log('✅ Search function working, found', searchResults.length, 'results');

    // Test 5: Test statistics function
    console.log('\n5. Testing statistics function...');
    const { data: stats, error: statsError } = await supabase
      .rpc('get_incident_stats')
      .single();

    if (statsError) {
      console.error('❌ Error getting statistics:', statsError.message);
      return;
    }
    console.log('✅ Statistics function working:', stats);

    // Test 6: Clean up test data
    console.log('\n6. Cleaning up test data...');
    const { error: deleteError } = await supabase
      .from('incidents')
      .delete()
      .eq('id', newIncident.id);

    if (deleteError) {
      console.error('❌ Error deleting test incident:', deleteError.message);
      return;
    }
    console.log('✅ Test incident deleted successfully');

    console.log('\n🎉 All tests passed! Your schema is working correctly.');
    console.log('\nNext steps:');
    console.log('1. Make sure your .env file has the correct Supabase credentials');
    console.log('2. Run: npm start');
    console.log('3. Open http://localhost:3000 in your browser');
    console.log('4. Try creating, editing, and deleting incidents');

  } catch (error) {
    console.error('❌ Unexpected error:', error.message);
  }
}

testSchema();
