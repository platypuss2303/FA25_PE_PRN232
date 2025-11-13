using PostManagementAPI.Data;
using PostManagementAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace PostManagementAPI.Services
{
    public class DatabaseSeeder
    {
        private readonly AppDbContext _context;
        private readonly ILogger<DatabaseSeeder> _logger;

        public DatabaseSeeder(AppDbContext context, ILogger<DatabaseSeeder> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task SeedAsync()
        {
            try
            {
                // Ensure database is created
                await _context.Database.MigrateAsync();

                // Check if we already have movies
                if (await _context.Movies.AnyAsync())
                {
                    _logger.LogInformation("Database already contains movies. Skipping seed.");
                    return;
                }

                _logger.LogInformation("Seeding database with sample movies...");

                var sampleMovies = new List<Movie>
                {
                    new Movie
                    {
                        Title = "The Shawshank Redemption",
                        Genre = "Drama",
                        Rating = 5,
                        PosterImageUrl = "https://images.unsplash.com/photo-1536440136628-849c177e76a1",
                        CreatedAt = DateTime.UtcNow.AddDays(-10),
                        UpdatedAt = DateTime.UtcNow.AddDays(-10)
                    },
                    new Movie
                    {
                        Title = "The Dark Knight",
                        Genre = "Action",
                        Rating = 5,
                        PosterImageUrl = "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb",
                        CreatedAt = DateTime.UtcNow.AddDays(-9),
                        UpdatedAt = DateTime.UtcNow.AddDays(-9)
                    },
                    new Movie
                    {
                        Title = "Inception",
                        Genre = "Sci-Fi",
                        Rating = 5,
                        PosterImageUrl = "https://images.unsplash.com/photo-1440404653325-ab127d49abc1",
                        CreatedAt = DateTime.UtcNow.AddDays(-8),
                        UpdatedAt = DateTime.UtcNow.AddDays(-8)
                    },
                    new Movie
                    {
                        Title = "Pulp Fiction",
                        Genre = "Crime",
                        Rating = 5,
                        PosterImageUrl = "https://images.unsplash.com/photo-1478720568477-152d9b164e26",
                        CreatedAt = DateTime.UtcNow.AddDays(-7),
                        UpdatedAt = DateTime.UtcNow.AddDays(-7)
                    },
                    new Movie
                    {
                        Title = "Forrest Gump",
                        Genre = "Drama",
                        Rating = 5,
                        PosterImageUrl = "https://images.unsplash.com/photo-1485846234645-a62644f84728",
                        CreatedAt = DateTime.UtcNow.AddDays(-6),
                        UpdatedAt = DateTime.UtcNow.AddDays(-6)
                    },
                    new Movie
                    {
                        Title = "The Matrix",
                        Genre = "Sci-Fi",
                        Rating = 4,
                        PosterImageUrl = "https://images.unsplash.com/photo-1534447677768-be436bb09401",
                        CreatedAt = DateTime.UtcNow.AddDays(-5),
                        UpdatedAt = DateTime.UtcNow.AddDays(-5)
                    },
                    new Movie
                    {
                        Title = "Goodfellas",
                        Genre = "Crime",
                        Rating = 4,
                        PosterImageUrl = "https://images.unsplash.com/photo-1594908900066-3f47337549d8",
                        CreatedAt = DateTime.UtcNow.AddDays(-4),
                        UpdatedAt = DateTime.UtcNow.AddDays(-4)
                    },
                    new Movie
                    {
                        Title = "The Avengers",
                        Genre = "Action",
                        Rating = 4,
                        PosterImageUrl = "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0",
                        CreatedAt = DateTime.UtcNow.AddDays(-3),
                        UpdatedAt = DateTime.UtcNow.AddDays(-3)
                    },
                    new Movie
                    {
                        Title = "The Hangover",
                        Genre = "Comedy",
                        Rating = 4,
                        PosterImageUrl = "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba",
                        CreatedAt = DateTime.UtcNow.AddDays(-2),
                        UpdatedAt = DateTime.UtcNow.AddDays(-2)
                    },
                    new Movie
                    {
                        Title = "Titanic",
                        Genre = "Romance",
                        Rating = 4,
                        PosterImageUrl = "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c",
                        CreatedAt = DateTime.UtcNow.AddDays(-1),
                        UpdatedAt = DateTime.UtcNow.AddDays(-1)
                    }
                };

                await _context.Movies.AddRangeAsync(sampleMovies);
                await _context.SaveChangesAsync();

                _logger.LogInformation($"Successfully seeded {sampleMovies.Count} movies to the database.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while seeding the database.");
                throw;
            }
        }
    }
}
