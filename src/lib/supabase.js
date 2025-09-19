import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Helper functions for incidents
export const incidentsAPI = {
  // Get all incidents
  async getAll() {
    const { data, error } = await supabase
      .from('incidents')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Get incident by ID
  async getById(id) {
    const { data, error } = await supabase
      .from('incidents')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  // Create new incident
  async create(incident) {
    const { data, error } = await supabase
      .from('incidents')
      .insert([incident])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Update incident
  async update(id, updates) {
    const { data, error } = await supabase
      .from('incidents')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Delete incident
  async delete(id) {
    const { error } = await supabase
      .from('incidents')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  },

  // Search incidents
  async search(searchTerm) {
    const { data, error } = await supabase
      .rpc('search_incidents', { search_term: searchTerm })
    
    if (error) throw error
    return data
  },

  // Get incident statistics
  async getStats() {
    const { data, error } = await supabase
      .rpc('get_incident_stats')
      .single()
    
    if (error) throw error
    return data
  }
}
