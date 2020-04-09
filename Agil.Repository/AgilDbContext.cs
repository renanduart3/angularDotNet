using Agil.Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Agil.Repository
{
    public class AgilDbContext: IdentityDbContext
    {
        public AgilDbContext(DbContextOptions<AgilDbContext> options):base(options)
        {
            
        }
        public DbSet<Evento> Eventos {get;set;}
        public DbSet<Lote> Lotes {get;set;}
        public DbSet<Palestrante> Palestrantes {get;set;}
        public DbSet<PalestranteEvento> PalestrantesEventos {get;set;}
        public DbSet<RedeSocial> RedesSociais {get;set;}

        protected override void OnModelCreating(ModelBuilder modelBuilder){
            modelBuilder.Entity<PalestranteEvento>()
            .HasKey(pe => new {pe.EventoId, pe.PalestranteId});

        }
    }
}