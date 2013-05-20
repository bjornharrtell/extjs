module ExtJS
  module SassExtensions
    module Functions
      module Utils
        @maps = Array.new()
        class << self; attr_accessor :maps; end

        def parsebox(list, n)
          assert_type n, :Number
          if !n.int?
            raise ArgumentError.new("List index #{n} must be an integer")
          elsif n.to_i < 1
            raise ArgumentError.new("List index #{n} must be greater than or equal to 1")
          elsif n.to_i > 4
            raise ArgumentError.new("A box string can't contain more then 4")
          end

          new_list = list.clone.to_a
          size = new_list.size
                      
          if n.to_i >= size
            if size == 1
              new_list[1] = new_list[0]
              new_list[2] = new_list[0]
              new_list[3] = new_list[0]
            elsif size == 2
              new_list[2] = new_list[0]
              new_list[3] = new_list[1]
            elsif size == 3
              new_list[3] = new_list[1]
            end
          end
          
          new_list.to_a[n.to_i - 1]
        end
        
        def parseint(value)
          Sass::Script::Number.new(value.to_i)
        end

        def ERROR(message)
          raise ArgumentError.new(message)
        end

        def map_create()
          map = Hash.new()
          id = Utils.maps.length;
          Utils.maps.insert(id, map);
          Sass::Script::Number.new(id+1)
        end
        def map_get(mapId, key)
          id = mapId.to_i()-1
          map = Utils.maps[id]
          k = key.to_s()
          v = map[k]
          if !v
            v = Sass::Script::String.new("")
          end
          v
        end
        def map_put(mapId, key, value)
          id = mapId.to_i()-1
          map = Utils.maps[id]
          k = key.to_s()
          map[k] = value
        end
        
        # Returns a background-image property for a specified images for the theme
        def theme_image(path, relative = false)
          path = path.value
          
          relative_path = "images/"
          
          if relative
            if relative.class == Sass::Script::String
              relative_path = relative.value
              relative = true
            elsif relative.class == FalseClass || relative.class == TrueClass
              relative = relative
            else
              relative = relative.value
            end
          else
            relative = false
          end
          
          if relative
            image_path = File.join(relative_path, path)
          else
            image_path = File.join('images', path)
          end
          
          Sass::Script::String.new(image_path)
        end

        def theme_image_exists(directory, path)
          result = false

          where_to_look = File.join(directory.value, path.value)
          
          if where_to_look && FileTest.exists?("#{where_to_look}")
            result = true
          end

          return Sass::Script::Bool.new(result)
        end
      end
    end
  end
end

module Sass::Script::Functions
  include ExtJS::SassExtensions::Functions::Utils
end